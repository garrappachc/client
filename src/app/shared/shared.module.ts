import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SteamLoginButtonComponent } from './steam-login-button/steam-login-button.component';
import { ConnectStringToLinkPipe } from './connect-string-to-link.pipe';
import { RulesComponent } from './rules/rules.component';
import { MarkdownModule } from 'ngx-markdown';
import { SafeMumbleUrlPipe } from './safe-mumble-url.pipe';

@NgModule({
  declarations: [
    SteamLoginButtonComponent,
    ConnectStringToLinkPipe,
    RulesComponent,
    SafeMumbleUrlPipe,
  ],
  imports: [
    CommonModule,
    MarkdownModule.forChild(),
  ],
  exports: [
    SteamLoginButtonComponent,
    ConnectStringToLinkPipe,
    RulesComponent,
    SafeMumbleUrlPipe,
  ]
})
export class SharedModule { }
