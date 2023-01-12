import dotenv from "dotenv";
dotenv.config();
import Avanza from 'avanza'
import { exit } from "process";
import express from "express";


class AvanzaConnector{
  private avanza = new Avanza();
  private app = express()
  private port = Number(process.env.PORT) || 3000;
  public async init(){
    await this.initAvanza();
    this.app.listen(this.port, () => {
      console.log(`Example app listening on port ${this.port}`)
    })
    this.app.get("/get-avanza-prom-info", this.getAvanzaPromInfo);    
    
  }
  private async initAvanza(){
    try{
      const auth = await this.avanza.authenticate({
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

  public async getAvanzaPromInfo(req: express.Request, res: express.Response){
    let info = await this.avanza.getOverview();
    res.json(info);

  }
  public getEnv(prop: string) : string{
    return process.env[prop] || (()=> {console.log(`Missing ${prop}`); exit(-1);})();
  }
}

let a = new AvanzaConnector();
a.init();
