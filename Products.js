
class Product{
  constructor(){
    this.DB = []
  }

  getMaxId(items){
    const length = items.length;

    if(length < 1) return 1

    return items[length-1].id + 1;
  }

  getById(id){
    const items = this.DB;
    return items.find(p => p.id == id)
  }

  deleteById(id) {
    const items = this.DB;
    const idx = items.findIndex(p => p.id == id) 
    items.splice(idx , 1)

    this.DB = items
  }  
  
  getAll(){
    return this.DB
  }  

  save(item){
    if(typeof item.id === 'undefined'){
      const id = this.getMaxId(this.DB);
      this.DB.push({id, ...item});
    }else{
      const items = this.DB;
      const idx = items.findIndex(p => p.id == item.id) 
      items.splice(idx , 1, item)
      this.DB = items
    }

  }

}

module.exports = Product;