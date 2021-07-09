import Emitter from '../emitter';

class TechSupportExt {
    constructor() {
        Emitter.on("techsupport_authorizedPersonId_changed", ({event: event, form: form, dataProvider: dataProvider}) => {
            alert(event.target.value)

            dataProvider.getOne('user', {id: event.target.value}).then(({data}) => {
                console.log(data)

                form.change("authorizedPerson", data.firstname + " " + data.lastname)
            })
        })
    }
}

export default new TechSupportExt