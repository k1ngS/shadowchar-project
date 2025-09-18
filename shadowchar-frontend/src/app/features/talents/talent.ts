import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Talent {
  id: number;
  key: string;
  name: string;
  description?: string;
  tier: string;
  available?: boolean;
  reason?: string | null;
}

export interface CharacterTalent {
  id: number;
  characterId: number;
  talentId: number;
  source: string;
  talent: Talent;
}

@Injectable({
  providedIn: 'root',
})
export class TalentService {
  private baseUrl = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) {}

  getTalentsForCharacter(characterId: number): Observable<CharacterTalent[]> {
    return this.http.get<CharacterTalent[]>(`${this.baseUrl}/${characterId}/talents`);
  }

  getAvailableTalents(characterId: number): Observable<Talent[]> {
    return this.http.get<Talent[]>(`${this.baseUrl}/${characterId}/talents/available`);
  }

  addTalentToCharacter(
    characterId: number,
    talentId: number,
  ): Observable<CharacterTalent> {
    const payload = { talentId };
    return this.http.post<CharacterTalent>(`${this.baseUrl}/${characterId}/talents`, payload);
  }

  removeTalentFromCharacter(characterId: number, talentId: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${characterId}/talents/${talentId}`);
  }
}
