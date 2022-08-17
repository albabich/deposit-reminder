import fetch from 'unfetch';

const checkStatus = response => {
    if (response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const getAllDeposits = () => fetch('api/deposits').then(checkStatus);

export const addNewDeposit = deposit =>
    fetch('api/deposits', {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(deposit)
    }).then(checkStatus);

export const updateDeposit = (id, deposit) =>
    fetch(`api/deposits/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(deposit)
    })
        .then(checkStatus);

export const updateContribution = (id, contribution) =>
    fetch(`api/contributions/${id}`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(contribution)
    })
        .then(checkStatus);

export const addNewContribution = (depositContribution) =>
    fetch(`api/contributions`, {
        headers: {
            'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(depositContribution)
    })
        .then(checkStatus);

export const deleteDeposit = id =>
    fetch(`api/deposits/${id}`, {
        method: 'DELETE'
    }).then(checkStatus);

export const deleteContribution = id =>
    fetch(`api/contributions/${id}`, {
        method: 'DELETE'
    }).then(checkStatus);