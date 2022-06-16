const { Router } = require( 'express' )

const Products = require( '../productsController' )
const router = new Router()
const DATA_BASE = new Products( 'products' )
const AllProds = DATA_BASE.getAllProducts()

// Get All Products
router.get( '/', async ( req, res ) =>
{
  const getAllProds = await AllProds
  if ( getAllProds.length ) {
    res.json( getAllProds )
  } else {
    res.send( { message: 'No products found' } )
  }
} )

// Get Porduc by ID
router.get( '/:id', async ( req, res ) =>
{
  try {
    const id = parseInt( req.params.id )
    const getProdById = await DATA_BASE.getProductById( id )
    if ( getProdById ) {
      res.json( getProdById )
    } else {
      res.json( { message: 'No product id provided' } )
    }
  } catch ( err ) {
    console.log( err )
  }
} )

// Add New Product
router.post( '/add', async ( req, res ) =>
{
  try {
    const newProds = await DATA_BASE.createProduct( req.body )
    res.redirect( '/' ).render( newProds )
    return newProds
  } catch ( error ) {
    console.log( err )
  }
} )

// Edit Product by ID
router.put( '/:id', async ( req, res ) =>
{
  try {
    const id = parseInt( req.params.id )
    const editedProd = await DATA_BASE.getProductById( id )

    let edit = req.body
    edit.id = editedProd.id

    const editPord = edit

    await DATA_BASE.updateProduct( editPord )
    res.redirect( '/edit' )
    return editPord
  } catch ( error ) {
    console.log( error )
  }
} )

// Delete Product
router.delete( '/delete/:id', async ( req, res ) =>
{
  try {
    const id = parseInt( req.params.id )
    const deleteProdById = await DATA_BASE.deleteProduct( id )
    if ( deleteProdById ) {
      res.json( deleteProdById )
    } else {
      res.json( { message: 'No product id provided' } )
    }
  } catch ( error ) {
    console.log( err )
  }
} )
module.exports = router
