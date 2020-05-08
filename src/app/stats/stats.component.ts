import { Component, OnInit, ViewChild } from '@angular/core';
import { Track } from '../shared/models/track';
import { Artist } from '../shared/models/artist';
import { ApiService } from '../shared/services/api/api.service';
import { SnackbarService } from "../shared/services/snackbar/snackbar.service";

import { MatPaginator, MatTableDataSource } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  // contains the OAuth Token
  authToken = '';

  // Arrays for the displayed List
  topArtists = [];
  topTracks = [];

  // mat-select Arrays
  types: String[] = ['Artists', 'Tracks'];
  timeRanges = [
    { name: 'Short (last 4 weeks)', code: 'short_term' },
    { name: 'Medium (last 6 months)', code: 'medium_term' },
    { name: 'Long (last several years)', code: 'long_term' }
  ];

  // selected Values
  type: String = 'Artists';
  timeRange = this.timeRanges[1];

  // angular material formControl
  limitFormControl = new FormControl('', [
    Validators.max(50),
    Validators.required
  ]);

  // dataTable definitions
  // artists
  displayedColumnsArtists: string[] = ['name', 'genre', 'follower'];
  dataSourceArtists: MatTableDataSource<Artist>;
  // tracks
  displayedColumnsTracks: string[] = ['name', 'artists', 'album'];
  dataSourceTracks: MatTableDataSource<Track>;

  // --- CONSTRUCTOR ---
  @ViewChild(MatPaginator) paginator: MatPaginator;
  constructor(private apiService: ApiService,
    private snackService: SnackbarService, private router: Router) {
    this.limitFormControl.setValue(10); // default value for limit
  }

  ngOnInit() {
    this.executeApiCall();
  }

  executeApiCall() {
    // Do not execute, if formControl contains wrong data
    if (!this.limitFormControl.valid) {
      this.limitFormControl.markAsTouched();
      return;
    }
    this.topArtists = [];
    this.topTracks = [];

    this.applyDataSource();

    this.authToken = this.getToken();
    this.getData(this.authToken, this.type, this.timeRange.code, this.limitFormControl.value);
  }

  // apply new dataSource and paginator
  applyDataSource() {
    this.dataSourceArtists = new MatTableDataSource(this.topArtists);
    this.dataSourceTracks = new MatTableDataSource(this.topTracks);
    if (this.type === 'Artists') {
      this.dataSourceArtists.paginator = this.paginator;
    } else {
      this.dataSourceTracks.paginator = this.paginator;
    }
  }

  // get the OAuth Token from URL
  getToken(): string {
    // let value = this.route.snapshot.queryParams['#access_token']; // use query params
    let token = '';
    const url = window.location.href || '';
    const queryString = (url).substr((url).indexOf('?') + 1);
    const value = (queryString.split('='))[1];
    token = value ? value.substring(0, 163) : '';
    return token;
  }

  // get the API Data
  async getData(token: String, type: String, timeRange: String = 'medium_term', limit: String = '10', offset: String = '0') {
    let topArray = [];


    await this.apiService.getData(token, type, timeRange, limit).toPromise()
      .then((res: any) => {
        topArray = res.items;
      })
      .catch(err => {
        if (err.status == 401) {
          this.snackService.openSnackBar('An error occured while loading your spotify data. Try to login again.');
          setTimeout(() => { this.apiService.authorization(); }, 4000);
        }
      });

    // simplify the topArray to Artists[] and/or Tracks[]
    if (type.toLowerCase() === 'artists') {
      this.topArtists = this.simplifyArtists(topArray);
    } else if (type.toLowerCase() === 'tracks') {
      this.topTracks = this.simplifyTracks(topArray);
    }

    // apply new dataSource and paginator after the API Data has been simplyfied
    this.applyDataSource();
  }

  simplifyTracks(array): Track[] {
    const finalArray: Track[] = [];
    array.forEach(item => {
      const trackObject: Track = {
        type: item.type,
        name: item.name,
        preview_url: item.preview_url,
        spotifyLink: item.external_urls.spotify,
        artists: this.getNameOfArtist(item.artists),
        album: item.album.name
      };

      finalArray.push(trackObject);
    });

    return finalArray;
  }

  simplifyArtists(array) {
    const finalArray: Artist[] = [];
    array.forEach(item => {
      const artistObject: Artist = {
        name: item.name,
        spotifyLink: item.external_urls.spotify,
        image: item.images[0].url,
        genres: this.structureGenres(item.genres),
        follower: new Intl.NumberFormat('en-us').format(item.followers.total)
      };

      finalArray.push(artistObject);
    });

    return finalArray;
  }

  structureGenres(array: String[]): String[] {
    array.forEach(genre => {
      array[array.indexOf(genre)] = ' ' + this.capitalizeFirstLetter(genre);
    });
    return array;
  }

  capitalizeFirstLetter(string: String) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  getNameOfArtist(array): String[] {
    const returnVal = [];
    array.forEach(item => {
      if (returnVal.length <= 2) {
        returnVal.push(' ' + item.name);
      } else {
        returnVal.push(' ...');
      }
    });

    return returnVal;
  }

}
