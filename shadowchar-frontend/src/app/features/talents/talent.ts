import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Talent {
  id: number;
  name: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  private baseUrl = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) {}

  getTalentsForCharacter(characterId: number): Observable<Talent[]> {
    return this.http.get<Talent[]>(`${this.baseUrl}/${characterId}/talents`);
  }

  addTalentToCharacter(
    characterId: number,
    talentData: { name: string; description?: string },
  ): Observable<Talent> {
    return this.http.post<Talent>(`${this.baseUrl}/${characterId}/talents`, talentData);
  }
}
