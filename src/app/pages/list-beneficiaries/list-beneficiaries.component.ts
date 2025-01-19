import { Component } from '@angular/core';

import { SharedTableComponent } from "../../shared/components/shared-table/shared-table.component";
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
import { GlobalTableHeaderComponent } from "../../shared/components/global-table-header/global-table-header.component";
export interface Beneficiary {
  id: number;
  name: string;
  technology: string;
  gender: string;

  budget: number;
  title: string;
  rate: number;
  status: number;
}



@Component({
  selector: 'app-list-beneficiaries',
  standalone: true,
  imports: [SharedTableComponent, CommonModule, GlobalTableHeaderComponent],
  templateUrl: './list-beneficiaries.component.html',
  styleUrl: './list-beneficiaries.component.scss'
})
export class ListBeneficiariesComponent {
  beneficiaries!:Observable<Beneficiary[] > 
  beneficiariesColumns!:{key: string; displayName: string;sortable?: boolean }[ ] 

  ngOnInit(){
    this.beneficiariesColumns = [    { key: 'name', displayName: 'Name',sortable: true },
       { key: 'technology', displayName: 'Technology',sortable: false  },  { key: 'budget', displayName: 'Budget',sortable: true },  { key: 'rating', displayName: 'Rate',sortable: false  }, { key: 'status', displayName: 'Status',sortable: false  },  { key: 'actions', displayName: 'Actions',sortable: false  }];
    this.beneficiaries  = of( [
      

      
      { id: 1, name: 'Alice Johnson', gender: 'Female', technology: "JavaScript, Angular, Node.js", budget: 1000, title: 'Developer', rate: 5, status: 1, info: 'alice.johnson@example.com' },
      { id: 2, name: 'Bob Smith', gender: 'Male', technology: "HTML, CSS, Photoshop", budget: 2000, title: 'Designer', rate: 4, status: 0, info: 'bob.smith@example.com' },
      { id: 3, name: 'Charlie Brown', gender: 'Female', technology: "Java, Spring Boot, Hibernate", budget: 1500, title: 'Project Manager', rate: 4, status: 1, info: 'charlie.brown@example.com' },
      { id: 4, name: 'Diana Prince', gender: 'Female', technology: "Python, Django, Flask", budget: 3000, title: 'Tester', rate: 3, status: 1, info: 'diana.prince@example.com' },
      { id: 5, name: 'Evan Taylor', gender: 'Male', technology: "C#, .NET, SQL", budget: 1200, title: 'Developer', rate: 4, status: 1, info: 'evan.taylor@example.com' },
      { id: 6, name: 'Fiona Davis', gender: 'Female', technology: "React, Redux, TypeScript", budget: 2500, title: 'Analyst', rate: 2, status: 1, info: 'fiona.davis@example.com' },
      { id: 7, name: 'George Miller', gender: 'Male', technology: "Kotlin, Android, Firebase", budget: 1800, title: 'Lead Developer', rate: 5, status: 0, info: 'george.miller@example.com' },
      { id: 8, name: 'Hannah Wilson', gender: 'Female', technology: "Swift, iOS, Xcode", budget: 2700, title: 'Architect', rate: 1, status:1 , info: 'hannah.wilson@example.com' },
      { id: 9, name: 'Ian Thomas', gender: 'Male', technology: "Ruby, Rails, PostgreSQL", budget: 1900, title: 'Scrum Master', rate: 4,status: 1, info: 'ian.thomas@example.com' },
      { id: 10, name: 'Jane Doe', gender: 'Female', technology: "PHP, Laravel, MySQL", budget: 2300, title: 'Product Owner', rate: 4, status: 0, info: 'jane.doe@example.com' },
    ]  
    )
  }
}
