import { Injectable, Injector, Type } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ResourceFactory {
  constructor(protected injector: Injector) {
  }

  resolveDeps(type: Type<any>): any[] {
    // collect parameter type metadata information
    const paramTypes = Reflect.getOwnMetadata('design:paramtypes', type) || [];
    // todo(@janunld): it's VERY IMPORTANT to introduce safe compatibility logic
    //  here. as these lines do heavily abuse some internal angular definitions,
    //  we should consider some easy to migrate, perhaps providable behavior
    const ngParamTypes = type[ '__parameters__' ]?.map(decorators => {
      return decorators.find(d => 'token' in d)?.token;
    });
    return paramTypes?.map(paramType => {
      return paramType === Object
        ? ngParamTypes.shift()
        : paramType;
    });
  }

  create<T>(type: Type<T>, values?: Partial<T>): T {
    const deps = this.resolveDeps(type);
    const instance = new type(...deps.map(dep => this.injector.get(dep)));
    if (values != null) {
      // if we have any values defined to be set to the instance than we should
      // iterate through them to append them to the created instance
      for (const [ propertyKey, value ] of Object.entries(values))
        // but we should definitely check whether the instance already has
        // any property already set when iterating through the values, because
        // we don't want to overwrite any injected values here
        if (!instance.hasOwnProperty(propertyKey))
          instance[ propertyKey ] = value;
    } else return instance;
  }
}
