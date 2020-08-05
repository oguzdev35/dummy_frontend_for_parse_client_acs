import Axios from 'axios';



export const createDoorAPI = (name, id) => {

    Axios({
        method: 'POST',
        url: '/createdoor',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            "doorName": name,
            "doorID": id
        }
    })
        .then( res =>  console.log(res.data))
        .catch( err => {
            console.error(err.message);
            return null;
        } )

}

export const updateDoorAPI = (name, id) => {

    Axios({
        method: 'POST',
        url: '/updatedoor',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            "doorName": name,
            "doorID": id
        }
    })
        .then( res =>  console.log(res.data))
        .catch( err => {
            console.error(err.message);
            return null;
        } )

}

export const updatePersonAPI = (name, id, title, doors) => {

    Axios({
        method: 'POST',
        url: '/updateperson',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            "personID": id,
            "name": name,
            "title": title,
            "doors": doors
        }
    })
        .then( res =>  console.log(res.data))
        .catch( err => {
            console.error(err.message);
            return null;
        } )

}

export const createPersonAPI = (name, id, title) => {

    Axios({
        method: 'POST',
        url: '/createperson',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            "personID": id,
            "name": name,
            "title": title
        }
    })
        .then( res =>  console.log(res.data))
        .catch( err => {
            console.error(err.message);
            return null;
        } )

}

export const getDoorsAPI = () => {
    return Axios({
        method: 'GET',
        url: "/getdoors",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then( res => res.data.doors)
        .catch( err => {
            console.log(err.message);
            return null;
        })
}

export const getPersonsAPI = () => {
    return Axios({
        method: 'GET',
        url: "/getpersons",
        headers: {
            'Accept': 'application/json'
        }
    })
        .then( res => res.data.persons)
        .catch( err => {
            console.log(err.message);
            return null;
        })
}

export const deleteDoorAPI = doorID => {
    return Axios({
        method: 'POST',
        url: "/deletedoor",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            'doorID': doorID
        }
    })
        .then( res => console.log(res.data))
        .catch( err => {
            console.log(err.message);
            return null;
        })
}

export const deletePersonAPI = personID => {
    return Axios({
        method: 'POST',
        url: "/deleteperson",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            'personID': personID
        }
    })
        .then( res => console.log(res.data))
        .catch( err => {
            console.log(err.message);
            return null;
        })
}

export const accessAPI = (personID, doorID) => {
    return Axios({
        method: 'POST',
        url: '/access',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        data: {
            'personID': personID,
            'doorID': doorID
        }
    })
        .then( res => {
            return res.data
        })
        .catch( err => {
            console.log(err.message);
            return null;
        })
}