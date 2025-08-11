const Provider = require("../models/Provider")

const categoriesList = async (req, res) => { // This show all categories for the provider
    try {
    const id = req.params.id;
    const provider = await Provider.findById(id); 
    if (!provider) {
            return res.send('Provider not found');
    }
        res.send({ categories: provider.categories })
    }
    catch (error) {
        console.log(error)
    }   
}

const categoryRequests = async (req, res) => { // This show all requests inside one category
        try {
        const categoryId = req.params.id;
        const requests = await Request.find({ categories: categoryId });
      
        res.send(requests);
        } catch (error) {
        console.log(error)
    }

}


const singleRequest = async (req, res) => { // This show only a single request inside the specific category
    try {
        const provider = await Provider.findById(req.params.id)
        res.send(provider)
    }
    catch (error) {
        console.log(error)
    }
}

const applyRequest = async (req, res) => { // Apply the single request inside the specific category
    try {
        const provider = await Provider.findById(req.params.id)
        if(provider){
            res.send(provider)
        }
        else {
            console.log('Should apply the request')
        }
    }
    catch (error) {
        console.log(error)
    }
}

const deleteRequest = async (ree, res) => { // Delete the request inside the specific category
    try {
        const provider = await Provider.findByIdAndDelete(req.params.id)
        res.send(provider)
    }
    catch (error) {
        console.log(error)
    }
}

module.exports = {
    categoriesList,
    categoryRequests,
    singleRequest,
    applyRequest,
    deleteRequest
}
