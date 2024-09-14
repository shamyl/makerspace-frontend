import { Component, OnInit } from '@angular/core';
interface Membership {
  type: any;
  name: string;
  description: string;
  benefits: string[];
}
@Component({
  selector: 'app-membership',
  templateUrl: './membership.component.html',
  styleUrls: ['./membership.component.scss']
})
export class MembershipComponent implements OnInit {
  memberships = [
    {
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    }, {
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    }, {
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    }, {
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    },{
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    },{
      name: 'Python AI',
      description: 'skills leans AI Computer programming ',
      ratings: [1, 1, 1, 0, 0], // 4 stars
      imageUrl: 'assets/images/python.png'
    }
  ];


  constructor() { }

  ngOnInit(): void {
  }

}
