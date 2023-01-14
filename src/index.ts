import dotenv from "dotenv";
dotenv.config();
import Avanza from 'avanza'
import { exit } from "process";
import express from "express";
import prom from "prom-client";
import * as Colors from "./Colors";


interface AvanzaAccount{
   name: string;
   id: string;
}
interface AccountTrackers{
  totalProfit: prom.Gauge,
  totalBalance: prom.Gauge,
  account: AvanzaAccount
}



class AvanzaConnector{
  private avanza = new Avanza();
  private app = express()
  private port = Number(process.env.PORT) || 3000;
  private updateInterval = (Number(process.env.UPDATE_INTERVAL) || 60*5)*1000; // 1000 ms, total 5 min
  private accountsToTrack: Array<AvanzaAccount>;

  private gauges: Map<string, AccountTrackers> = new Map();  

  constructor(){

    this.accountsToTrack = this.getAccountsToTrack();

    this.accountsToTrack.map(account => {
      
      
      const balance = new prom.Gauge({
        name: this.formatAccountNameToProm(account.name, "balance"),
        help: `The total balance of account:  ${account.name} `,
      });
      const profit= new prom.Gauge({
        name: this.formatAccountNameToProm(account.name, "profit"),
        help: `The total profit of account:  ${account.name} `,
      });

      this.gauges.set(account.id, {
        totalBalance: balance,
        totalProfit: profit,
        account: account,
      });


    }).flat();
    this.init();
    
  }

  private getAccountsToTrack():  Array<AvanzaAccount>{
    const accounts = process.env.ACCOUNTS_TO_TRACK ||"";
    console.log(`Accounts found in ENV: ACCOUNTS_TO_TRACK is`, accounts);
    return accounts.split(",").map(e=> {
      const chunks = e.split(":");
      if(!prom.validateMetricName(chunks[0])){
        console.log(Colors.FgRed, `${chunks[0]} is not an ok prometheus name, please change`, Colors.Reset)
      }
      return {
        name: chunks[0],
        id: chunks[1],
      }
    }).filter(e => e!=undefined);
  }

  private async updateData(debug: Boolean = false){
    const overview = await this.avanza.getOverview();

    if(debug) console.log("Account available:\n"+ Colors.FgGreen+ overview.accounts.map(e => `${e.sparkontoPlusType || e.name}:${e.accountId}`).join("\n")+ Colors.Reset);

    overview.accounts.map(e=>{
      //if(debug) console.log("Account: ", e)
      const target = this.gauges.get(e.accountId);
      if(!target) return;

      if(debug) console.log("Updating ", e.name);
      target.totalBalance.set(e.totalBalance);
      target.totalProfit.set(e.totalProfit);
    })
  }

  private formatAccountNameToProm(name: string, type: string): string{
    const formatted = `avanza_account_${name.toLocaleLowerCase()}_${type}`;
    return formatted;
  }
  
  public async init(){
    await this.initAvanza();
    this.app.listen(this.port,  "0.0.0.0", () => {
      console.log(`Example app listening on port ${this.port}`)
    })
    this.app.get("/metrics", this.metrics.bind(this));
    this.updateData(true);

    setInterval(this.updateData.bind(this), this.updateInterval);

    
  }
  private async initAvanza(){
    console.log("Init avanza");
    try{
      await this.avanza.authenticate({
        username: this.getEnv("USERNAME"),
        password: this.getEnv("PASSWORD"),
        totp:"",
        totpSecret: this.getEnv("TOTP"),
      });
    }
    catch(err){
      console.error("Error in auth", err);
    }
  }


  private async metrics(req: express.Request, res: express.Response){

    res.contentType(prom.register.contentType);
    res.send(await prom.register.metrics());

  }
  public getEnv(prop: string) : string{
    return process.env[prop] || (()=> {console.log(`Missing ${prop}`); exit(-1);})();
  }
}

new AvanzaConnector();
