import { Component } from '@angular/core';
import { ISuperhero } from '../models/superhero.model';
import { StorageService } from '../storage.service';
import { SuperheroApiService } from '../superhero-api.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  
  superheroList: ISuperhero[] = []


  constructor(private api: SuperheroApiService, private storage: StorageService) {



  }

  ionViewWillEnter(){

    let favorite : any[] = []
    this.storage.getData("favoriteListStorage").subscribe({next: (value) => {
      favorite = value || []


      favorite.forEach(item => {
        this.api.searchById(item).subscribe({next: (result)=>{
          let superhero = {
            id: result.id,
            name: result.name,
            fullName: result.biography["full-name"],
            img: result.image.url,
            occupation: result.work.occupation,
            base: result.work.base,
            groupAffiliation: result.connections["group-affiliation"],
            relatives: result.connections.relatives,
            aliases: result.biography.aliases,
  
            isFavorite: true // vyhľadáva sa iba v obľúbených zo storage, takže true
          };
  
          this.superheroList.push(superhero)
        }})
      })
    }})
  }

  buttonAddToFavoriteListClick(id: number){
    let favorite :any[] = []
    this.storage.getData("favoriteListStorage").subscribe({next: (value) => {
      favorite = value || []; // ak sa v storage pod daným kľúčom nič nenachádza tak sa pole nenastaví na null ale na prázdne pole
      if(favorite.includes(id))
        return;
      favorite.push(id);
  
      this.storage.saveData("favoriteListStorage", favorite)
  
      this.superheroList.forEach(item => {
        if(favorite.includes(item.id)){
         item.isFavorite = true
        }
        else{
          item.isFavorite = false
        }
      })
    }})
  }
  
  buttonRemoveFromFavoriteListClick(id: number){
      let favorite : any[] = []
      this.storage.getData("favoriteListStorage").subscribe({next: (value) => {
      favorite = value || []
  
      favorite = favorite.filter((item:number) => item != id)
  
      this.storage.saveData("favoriteListStorage", favorite)
  
      this.superheroList.forEach(item => {
        if(favorite.includes(item.id)){
         item.isFavorite = true
        }
        else{
          item.isFavorite = false
        }
      })
  
    }})
  }
  
}
