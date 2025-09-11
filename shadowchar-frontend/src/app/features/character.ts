import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Character {
  id: number;
  name: string;
  ancestry: string;

  strength?: number;
  agility?: number;
  intellect?: number;
  will?: number;
}

@Injectable({
  providedIn: 'root',
})
export class CharacterService {
  private apiUrl = 'http://localhost:3000/characters';

  constructor(private http: HttpClient) {}

  createCharacter(characterData: { name: string; ancestry: string }): Observable<Character> {
    return this.http.post<Character>(this.apiUrl, characterData);
  }

  getCharacters(): Observable<Character[]> {
    return this.http.get<Character[]>(this.apiUrl);
  }

  getCharacterById(id: number): Observable<Character> {
    return this.http.get<Character>(`${this.apiUrl}/${id}`);
  }

  updateCharacter(id: number, characterData: Partial<Character>): Observable<Character> {
    return this.http.patch<Character>(`${this.apiUrl}/${id}`, characterData);
  }

  deleteCharacter(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
