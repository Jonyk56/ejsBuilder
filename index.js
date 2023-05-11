const ejs_ = require("ejs")
const Fs = require('@supercharge/filesystem')
const path = require("path")
class ejsBuilder {
	ejs = ejs_
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
			rendered = this.ejs.render(inputDat, this.#ejsData, this.#ejsOptions)
		}
		catch(err){
			return err
		}
		return rendered
	}
	renderFile(callback = (err,dat) => this.out = dat){
		var inputDat = this.getInput();
		var rendered = 0;
		this.ejs.renderFile(inputDat,this.#ejsData,this.#ejsOptions, callback)
		return this.out
	}

	clearCache(){
		this.ejs.clearCache()
	}
	setFileLoader(loaderfunc){
		ejs_.fileLoader = loaderfunc;
		return this;
	}
}

module.exports = ejsBuilder;