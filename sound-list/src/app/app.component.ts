import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Audio } from './interfaces/audio';
import { AUDIO_DATA } from './data/audio-data';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class AppComponent {
  dataSource = AUDIO_DATA;
  columnsToDisplay = ['ID', 'Audio name', 'Audio file name'];
  expandedElement!: Audio | null;
  @ViewChildren('audioPlayer') audioPlayers!: QueryList<ElementRef>;

  playAudio(currentAudio: HTMLAudioElement) {
    this.audioPlayers.forEach((player) => {
      const audioElement = player.nativeElement;
      if (audioElement != currentAudio) {
        audioElement.pause();
      }
    });
  }
}
