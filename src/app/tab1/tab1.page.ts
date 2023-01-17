import { Component } from '@angular/core';
import { SuperheroApiService } from '../superhero-api.service';
import { ISuperhero } from '../models/superhero.model';
import { StorageService } from '../storage.service';

@Component({
  
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})

export class Tab1Page {

  superheroList: ISuperhero[] = []
  searchText : string = ""


  constructor(private api: SuperheroApiService, private storage: StorageService) {

  //   this.api.search("iron").subscribe({next:(value) => {
  //     value.results.forEach((result:any) => {
  //         let superhero = {
  //           id: result.id,
  //           name: result.name,
  //           fullName: result.biography["full-name"],
  //           img: result.image.url,
  //           occupation: result.work.occupation,
  //           base: result.work.base,
  //           groupAffiliation: result.connections["group-affiliation"],
  //           relatives: result.connections.relatives,
  //           aliases: result.biography.aliases,

  //           isFavorite: false
  //         };

  //         this.storage.getData("favoriteListStorage").subscribe({next: (result) => {
  //           if(result.includes(superhero.id))
  //           {
  //             superhero.isFavorite = true
  //           }

  //           this.superheroList.push(superhero)
  //         }})

  //     });
  // }});
   }

   ionViewWillEnter()
   {
    
    if(this.superheroList){

      let favorite :any[] = []
      this.storage.getData("favoriteListStorage").subscribe({next: (value) => {
        favorite = value || []; // ak sa v storage pod daným kľúčom nič nenachádza tak sa pole nenastaví na null ale na prázdne pole

        this.superheroList.forEach(superhero => {
          superhero.isFavorite = favorite.includes(superhero.id)

      })

      }})
    }
   }

  onSearchChange(event: any) {
    this.superheroList = [];
    this.api.search(event.detail.value).subscribe({next:(value) => {
      if(value != undefined && value.results != undefined){
        value.results.forEach((result:any) => {
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

            isFavorite: false
          };

          this.storage.getData("favoriteListStorage").subscribe({next: (result) => {
            if(result.includes(superhero.id))
            {
              superhero.isFavorite = true
            }

            this.superheroList.push(superhero)
          }})
        
        });
      }
    }});
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
