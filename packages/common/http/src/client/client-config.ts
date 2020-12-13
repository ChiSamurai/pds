import { InjectionToken } from '@angular/core';

/** Base information required for any {@link Client} to be set up properly */
export interface ClientConfig {
  /** Gets the base url used for outgoing requests to the any server */
  baseUrl: string;

  /** Gets or sets any other occurring client configuration value */
  [ propertyKey: string ]: any;
}

/** Provides a {@link ClientConfig} object to any given DI scope that it's used in */
export const CLIENT_CONFIG = new InjectionToken<ClientConfig>('CLIENT_CONFIG', {
  providedIn: 'root', factory: () => ({ baseUrl: '/api' })
});
