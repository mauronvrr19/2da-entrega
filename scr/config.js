export default{
    filesystem:{
        path: './DB'
    },
    mongodb:{
        cnxStr: 'mongodb://localhost/ecommerce',
        options:{
            useNewur1Parser: true,
            useUnifiedTopology: true,
            usecreateIndex: true,
            serverSelectionTimeoutMS: 5000,}}}