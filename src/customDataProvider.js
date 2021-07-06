import { fetchUtils } from 'react-admin';
import { stringify } from 'query-string';

const apiUrl = 'http://localhost:8080/api';
const httpClient = fetchUtils.fetchJson;

export default {
    getList: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        // const query = {
        //     sort: JSON.stringify([field, order]),
        //     range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
        //     filter: JSON.stringify(params.filter),
        // };
        // const url = `${apiUrl}/${resource}?${stringify(query)}`;

        // return httpClient(url).then(({ headers, json }) => ({
        //     data: json,
        //     total: parseInt(headers.get('content-range').split('/').pop(), 10),
        // }));

        const q = {
            page: page - 1,
            size: perPage,
            "query": params.filter
        }

        return httpClient(`${apiUrl}/${resource}/q`, {
            method: 'POST',
            body: JSON.stringify(q),
        }).then(({ json }) => ({
            data: json.content.map(d => {d.id=d.uid; return d}),
            total: json.totalElements
        }))
    },

    getOne: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.id}`).then(({ json }) => ({
            data: json,
        })),

    getMany: (resource, params) => {
        const url = `${apiUrl}/${resource}/${params.ids}`;
        return httpClient(url).then(({ json }) => ({ data: json }));
    },

    getManyReference: (resource, params) => {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
     

        const q = {
            page: page - 1,
            size: perPage,
            "query": params.filter
        }
       // const url = `${apiUrl}/${resource}?${stringify(query)}`;

        return httpClient(`${apiUrl}/${resource}/q`, {
            method: 'POST',
            body: JSON.stringify(q),
        }).then(({ json }) => ({
            data: json.content.map(d => {d.id=d.uid; return d}),
            total: json.totalElements
        }))
    },

    update: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.uid}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json })),

    updateMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'PUT',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({ data: json }));
    },

    create: (resource, params) =>
        httpClient(`${apiUrl}/${resource}`, {
            method: 'POST',
            body: JSON.stringify(params.data),
        }).then(({ json }) => ({
            data: { ...params.data, id: json.uid },
        })),

    delete: (resource, params) =>
        httpClient(`${apiUrl}/${resource}/${params.uid}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json })),

    deleteMany: (resource, params) => {
        const query = {
            filter: JSON.stringify({ id: params.ids}),
        };
        return httpClient(`${apiUrl}/${resource}?${stringify(query)}`, {
            method: 'DELETE',
        }).then(({ json }) => ({ data: json }));
    }
};