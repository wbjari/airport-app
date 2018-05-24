import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Amqp } from "amqplib/callback_api";
import {Buffer } from 'buffer';

@Injectable()
export class NotificationSender {

  constructor(){  }

  sendFlightNotification(){
  
//  const amqp = 'amqplib/callback_api';
const amqp = new Amqp();
const conn = amqp.connect('amqp://localhost')
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
