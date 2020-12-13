import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CLIENT_CONFIG, ClientConfig } from './client-config';

@Injectable()
export abstract class Client {
  /**
   * @param config Gets the {@link ClientConfig} properties for the client instance
   * @param http   Gets the {@link HttpClient} instance for the client
   */
  constructor(
    @Inject(CLIENT_CONFIG) readonly config: ClientConfig,
    protected http: HttpClient
  ) {
  }
}


