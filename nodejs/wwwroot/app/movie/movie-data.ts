import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {Movie} from "./Movie";

let componentBaseUrl = '/api/movies';

@Injectable()
export class MovieData {
    /**
     *
     */
    private movies: Array<Movie> = [];
    componentBaseUrl: string;
    
    constructor(private http: Http) {
        this.http = http;
    }
    
    
    getAll() {
        return this.http.get(`${componentBaseUrl}`)
            .map(response => response.json())
            .map(json => 
                json.map(m => 
                    new Movie(m.id, m.title, m.rating, m.year)));
    }
    
    getById(id: number) {
        return this.http.get(`${componentBaseUrl}/${id}`)
            .map(response => response.json())
            .map(data => {
                let movie = new Movie(data.id, data.title, data.rating, data.year);
                return movie;
            });
    }
}