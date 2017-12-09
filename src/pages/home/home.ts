import { Component, OnInit ,ViewChild,ElementRef} from '@angular/core';

import { APIURL } from '../URL';
declare var $: any;
import * as moment from 'moment';
import { CommonService } from '../../app/common.service';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements OnInit {
 @ViewChild('datepicker') datepicker:ElementRef;
  constructor(private commonService: CommonService) { }
  rooms: any;
  booking: Array<any>
  Booking: Array<any>
  booked = [];
  payload = {
    "bookingId": 1217,
    "bookedFor": "",
    "bookedBy": "",
    "bookinginformation": this.booked,
    "status": "PENDING",
    "approvedBy": "PRO"

  };
  // temp: Array<any>
  selectDate = {
      searchDate: ""
    };
  ngOnInit() {
    this.selectDate = {
      searchDate: ""
    };
    this.booking = [];
    this.Booking = [];
  }
ErrorMeg
  submit() {
    this.booking = [];
    this.Booking = [];
    console.log(this.datepicker.nativeElement.value);
    this.selectDate.searchDate= moment(this.datepicker.nativeElement.value).format("YYYY-MM-DD");
    this.commonService.BookingStatus(APIURL.BOOKING_STATUS, this.selectDate)
      .subscribe(data => {
        if(data.Status==200){
        this.rooms = true;
        for (let i = 0; i < data.data.length; i++) {
          console.log(i)
          this.Booking.push(data.data[i][0]);
        }
        }else{
          this.ErrorMeg="Please Select Date!"
        }
      })
      
  }

  roomBook() {
    this.commonService.BookingRoom(APIURL.BOOKING_ROOMS, this.payload)
      .subscribe(data => {
        console.log(data);
        this.submit();
      })
  }

  RoomInfo(room, p) {
    this.booked.push({ roomId: room.ROOMID, date: p.DATE })
  }

  dPicker(e){
  $(e.target).pickadate();
  }

}
