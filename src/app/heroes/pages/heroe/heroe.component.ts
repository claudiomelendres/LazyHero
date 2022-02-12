import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Heroe} from "../../interfaces/heroes.interface";
import {of, switchMap, tap} from "rxjs";
import {HeroesService} from "../../services/heroes.service";

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: [ `
  .uno {
    background: black;
  }

  img {
    width: 100%;
    border-radius: 5px;

  }
  `
  ]
})
export class HeroeComponent implements OnInit {

  heroe!: Heroe;

  constructor(private activateRouter: ActivatedRoute,
              private router: Router,
              private heroesService: HeroesService,
  ) { }

  ngOnInit(): void {
    this.activateRouter.params
    // of('dc-batman','dc-superman')
      .pipe(
        switchMap(({id})=> this.heroesService.getHeroePorId(id)),
        tap(console.log)
      )
      .subscribe( heroe => {
        this.heroe = heroe;
        console.log(this.heroe.superhero)
      })
  }

  regresar() {
    this.router.navigate(['/heroes/listado']);
  }

}
