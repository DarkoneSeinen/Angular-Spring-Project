import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = environment.backendHost;

  constructor(private http: HttpClient) {}

  getDashboardStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/dashboard/stats`);
  }

  getMonthlyPayments(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/dashboard/monthly-payments`);
  }

  getPaymentStatus(): Observable<any> {
    return this.http.get(`${this.apiUrl}/api/dashboard/payment-status`);
  }
}
