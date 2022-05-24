import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.page.html',
  styleUrls: ['./confirm.page.scss'],
})
export class ConfirmPage implements OnInit {

  public data: any;
  public fg: FormGroup;
  public isFirstTime: boolean = true;

  constructor(private route: ActivatedRoute,private fb: FormBuilder, private router: Router) {

    this.fg = this.fb.group({
      'name': [null, Validators.required],
      'phone': [null, Validators.required],
      'amount': [null, Validators.required],
      'remark': null,
    });

    if (this.route.queryParams) {
      this.route.queryParams.subscribe(params => {
        let value = params["data"];
        if (value) {
          console.log(value);
          // this.fg.patchValue(value);
          this.data = JSON.parse(value);
          this.fg.setValue(this.data);
        }
      });
    }
  }

  ngOnInit() {
  }

  onSave() {
    if (this.isFirstTime) {
      this.isFirstTime = false;
    }

    if (this.fg.valid) {
      let param: NavigationExtras = { queryParams: { data: JSON.stringify(this.fg.value) } };
      console.log(param);
      
      this.router.navigate(['/receipt'], param);
    }
  }
  
}
