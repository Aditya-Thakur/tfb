import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { MyCart } from '../models/my-cart';

@Injectable({
  providedIn: 'root'
})

@Injectable()
export class MessageService {

  constructor() { }
  private subject = new Subject<any>();

    sendMessage(message: MyCart) {
        this.subject.next({ text: message });
    }

    clearMessage() {
        this.subject.next();
    }

    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
