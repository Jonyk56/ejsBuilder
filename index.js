const ejs_ = require("ejs")
const Fs = require('@supercharge/filesystem')
const path = require("path")
class ejsBuilder {
	#ejsInstance = {}
	#ejsOptions = {};
	#ejsData = {};
	constructor(){}  //---- Blank for now

	//setInput: Sets input location/data. the builder will use #getInputInternal to determine if it is a file later on.
	setInput(data){
		this.#ejsInstance.inputLoc = data;
		return this;
	}
	//getInput: gets input location/data
	getInput(){
		return this.#ejsInstance.inputLoc;
	}
	setDataValue(name, value){
		this.#ejsData[name] = value;
		return this;
	}
	setDataValues(dat){
		this.#ejsData += { ...dat}
		return this;
	}
	getDataValue(name){
		return this.#ejsData[name]
	}
	getDataValues(){
		return this.#ejsData
	}
	//internal
	async #getInputInternal(){
		let file = 0;
		if(Fs.isFile(this.#ejsInstance.inputLoc) ) console.log("1");
		return [this.#ejsInstance.inputLoc, file]
	}
	//set compile/render option
	setOption(option,value){
		this.#ejsOptions[option] = value;
		return this;
	}

	//get compiler/render option
	getOption(option){
		return this.#ejsOptions[option];
	}
	render(){
		var rendered = 0
		try{
			var inputDat = this.getInput();
			rendered = ejs_.render(inputDat, this.#ejsData, this.#ejsOptions)
		}
		catch(err){
			return err
		}
		return rendered
	}
	renderFile(callback = (err,dat) => this.out = dat){
		var inputDat = this.getInput();
		var rendered = 0;
		ejs_.renderFile(inputDat,this.#ejsData,this.#ejsOptions, callback)
		return this.out
	}
}

module.exports = ejsBuilder;