import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Amqp } from "amqplib/callback_api";
import {Buffer } from 'buffer';

@Injectable()
export class NotificationSender {
  amqp = new Amqp();
  constructor(){}

  sendFlightNotification(){
  
//  const amqp = 'amqplib/callback_api';
const conn = this.amqp.connect('amqp://localhost')
  conn.createChannel(function(err, ch) {
    var q = 'flightC';
    var msg = 'New Flight Created!';

    ch.assertQueue(q, {durable: false});
    ch.sendToQueue(q, new Buffer(msg));
    console.log(" [x] Sent %s", msg);
  });
 conn.close();
  }
}
