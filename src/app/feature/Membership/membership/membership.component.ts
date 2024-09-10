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
  memberships: Membership[] = [
    {
      type: 'Monthly',
      name: 'Basic Monthly',
      description: 'Access to basic features and benefits for one month.',
      benefits: ['Feature 1', 'Feature 2', 'Feature 3']
    },
    {
      type: 'Quarterly',
      name: 'Basic Quarterly',
      description: 'Access to basic features and benefits for three months.',
      benefits: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4']
    },
    {
      type: 'Yearly',
      name: 'Basic Yearly',
      description: 'Access to basic features and benefits for one year.',
      benefits: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5']
    }
    ];
  constructor() { }

  ngOnInit(): void {
  }

}
