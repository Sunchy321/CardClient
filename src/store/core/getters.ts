/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { State } from './state';

import { RouteLocationNormalizedLoaded } from 'vue-router';

import i18n from 'src/i18n';

import { mapValues } from 'lodash';
import { getDefault } from 'setup/page';

type StateWithRoute = State & { readonly route: RouteLocationNormalizedLoaded };

export function locales() { return Object.keys(i18n); }
export function locale(state: State) { return state.locale; }
export function search(state: State) { return state.search; }
export function title(state: State) { return state.title; }
export function titleType(state: State) { return state.titleType; }
export function actions(state: State) { return state.actions; }

export function params(state: State) {
    const values = paramValues(state);

    return mapValues(state.params, (param, key) => ({
        ...param,
        value: values[key],
    }));
}

export function paramValues(state: State) {
    const route = (state as StateWithRoute).route;

    return mapValues(state.params, (param, key) => {
        const defaultValue = getDefault(param);

        const realKey = param.key ?? key;

        switch (param.bind) {
        case 'params': {
            const result = route.params[realKey] as string;

            if (result == null) {
                return defaultValue;
            }

            if (param.type === 'number') {
                const num = Number.parseInt(result);

                if (Number.isNaN(num)) {
                    return defaultValue;
                } else {
                    return num;
                }
            } else {
                return result;
            }
        }
        case 'query': {
            const result = route.query[realKey] as string;

            if (result == null) {
                return defaultValue;
            }

            if (param.type === 'number') {
                const num = Number.parseInt(result);

                if (Number.isNaN(num)) {
                    return defaultValue;
                } else {
                    return num;
                }
            } else {
                return result;
            }
        }
        case 'props':
            return param.value ?? defaultValue;
        }
    });
}
