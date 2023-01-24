/* eslint-disable no-unused-vars */

import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components";
import CustomStepper from "../../components/stepper";
import { BUSD, IERC20, LaunchPadABI, LaunchPadAdd } from "../../config";
// import Step1 from "./steps/Step1";
import { Step1, Step2, Step3 } from "./steps";
import Step4 from "./steps/Step4";
import Web3 from "web3";
import { useNavigate } from "react-router-dom";
import Papa from "papaparse"
import { Contract } from "ethers";

import { ToastContainer, toast } from 'react-toastify';
import ResponsiveDialog from "../../Spinner";


const projectId = '2HdKrtd8GBGyqmO0u1BW2Re1hSK';
const projectSecret = '624bcf5bf92747f385771188371089f4';
const auth =
    'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
    const ipfsClient = require('ipfs-http-client');

export const getTokenContract = (library, account,tokenAdd) => {
	const signer = library?.getSigner(account).connectUnchecked();
	var contract = new Contract(tokenAdd,IERC20, signer);
	return contract;
};


const CreateToken = () => {

  const [step, setStep] = useState(0);
  const { account,library, chainId} = useWeb3React();
  const [open, setOpen] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [title,setTitle] = useState("Ratboy")
  const [token,setToken] = useState("0xf8c6E2d3148C218add6ecBeF409e7830103D1D49")
  const [owner,setOwner] = useState(account)
  const [noOfToken,setNoOFTokens] = useState(1000000)
  const [price,setPrice] = useState(0.1)
  const [hash,setHash] = useState()
  const [twitter,setTwitter] = useState("ratboy@twitter.com")
  const [medium,setMedium] = useState("ratboy@medium.com")
  const [telegram,setTelegram] = useState("ratboy@telegram.com")
  const [telegramGroup,setTeleGramGroup] = useState("ratboy@telegramGroup.com")
  const [Max,setMax] = useState(1000)
  const [Min,setMin] = useState(1)
  const [vesting,setVesting] = useState()
  const [IDOstart,setIDOStart] = useState()
  const [IDOEnd,setIDOEnd] = useState()
  const [currency,setCurrency] = useState(BUSD[`${chainId}`])
  const [vestingMonths,setVestingMonths] = useState(5)
  const [symbol,setSymbol] = useState("rt")
  const web3 = new Web3(Web3.givenProvider)
  const navigate = useNavigate()
  const [csv,setCSV] = useState(["0xfef5f69FA76f35638Aa3ed77a0644Fa79d31A554"])
  const [team,setTeam] = useState("Greg")
  const [description,setDescription] = useState("Some description")
  const [Allocaiton1,setAllocation1] = useState(5)
  const [Allocaiton2,setAllocation2] = useState(5)
  const [Allocaiton3,setAllocation3] = useState(5)
  const [ListingRate,setListingRate] = useState(0.1)
  const [SoftCap,setSoftCap] = useState(1000)
  const [hardCap,setHardCap] = useState(1000000)
  const [refund,setRefund] = useState("public")
  const [decimals,setDecimals] = useState(18)
  const [router,setRouter] = useState("0x9Ac64Cc6e4415144C455BD8E4837Fea55603e5c3")
  const [liquidity,setLiquidity]= useState(5)
  const [liquidityLock,setLiquidityLock]= useState(15)


  const [website,setWebsite] = useState("ratboy.com")
  const [facebook,setFacebook] = useState("ratboy@facebook.com")
  const [github,setGithub] = useState("github.com/ratboy")
  const [instagram,setInstagram] = useState("ratboy@insta.com")
  const [discord,setDiscord] = useState("ratboy@discord")
  const [redit,setRedit] = useState("ratboy@redit")





  const myContract2 = new web3.eth.Contract(LaunchPadABI,LaunchPadAdd[`${chainId}`])

  useEffect(()=>{
    const abc = async()=>{

      if(token && account){
        const tokenContract = getTokenContract(library,account,token)
        const _symbol = await tokenContract.symbol()
        setSymbol(_symbol)
        const _name = await tokenContract.name()
        setTitle(_name)
        const _decimals = await tokenContract.decimals()
        setDecimals(_decimals)
      }
    }

    abc()
    
    
  },[token,account,chainId])


  const array2 = csv && csv.map((v,e)=>v[0])

  csv && array2.pop()


//console.log("string",myContract2)
  const createPool = async ()=>{
    var counter = 0 
    setOpen(true)
    console.log("data",[      [token,owner,account,currency],
    [title,symbol,twitter,medium,telegram,telegramGroup],
    [web3.utils.toWei(noOfToken.toString(),"ether"),
    web3.utils.toWei(price.toString(),"ether"),
    web3.utils.toWei(Max.toString(),"ether"),
    web3.utils.toWei(Min.toString(),"ether"),
    //Date.parse(vesting)/1000,
    vestingMonths,
    Date.parse(IDOstart)/1000,
    Date.parse(IDOEnd)/1000
  ],
    hash,
    array2])
    try {
       const tx = await myContract2.methods.createIDO(
        [token,owner,account,currency,router],
    [title,symbol,twitter,medium,telegram,telegramGroup],
    [web3.utils.toWei(noOfToken.toString(),"ether"),
    web3.utils.toWei(price.toString(),"ether"),
    web3.utils.toWei(Max.toString(),"ether"),
    web3.utils.toWei(Min.toString(),"ether"),
    //Date.parse(vesting)/1000,
    vestingMonths,
    Date.parse(IDOstart)/1000,
    Date.parse(IDOEnd)/1000,
    Allocaiton1,
    Allocaiton2,
    Allocaiton3,
    web3.utils.toWei(ListingRate.toString(),"ether"),
    liquidity,liquidityLock,
  ],
    hash,
    array2).send({from:account}).
        on("confirmation",(e,r)=>{
          if(counter===0){
            setOpen(false)
            navigate("/")
            counter++  
          }
        })
      
        //  await tx.wait()
        //  if(tx){
        //   setOpen(false)
        //   navigate("/")
        //  }

      } catch (error) {
       console.log("error in create pool",error)
       setOpen(false)
     }
  }


  var imageBugger;


  const client = ipfsClient.create({
   host: 'ipfs.infura.io',
   port: 5001,
   protocol: 'https',
   headers: {
       authorization: auth,
   },
});



const captureFile = async(e)=>{
     e.preventDefault()
   const file = e.target.files[0]
   const reader = new window.FileReader()
   reader.readAsArrayBuffer(file)
   reader.onloadend = async ()=>{
    imageBugger = Buffer(reader.result)
     console.log("buffer",imageBugger)
 client.add(imageBugger).then((res) => {
   setHash(`https://gateway.pinata.cloud/ipfs/${res.path}`)

});}
}



const handleChange = async event => {
 const file = await event.target.files[0]
 Papa.parse(file, {
   complete: updateData,
   header: false
 });
 // const reader = new window.FileReader()
 // reader.readAsText(file)
 // reader.onloadend = async ()=>{   console.log("reader",reader.result) }
}

function  updateData(result) {
  var data = result.data;
  console.log(data);
   setCSV(data);
}


  const increaseStep = () => {
    setStep((prev) => prev + 1);
  };

  const decreaseStep = () => {
    setStep((prev) => prev - 1);
  };

  
console.log("data",Date.parse(IDOstart) )
  return (
    <Layout>
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"/>
      <div className="text-white mt-28 px-4">
        <div className="my-20 text-white">
          <div className=" hidden md:block">
            <CustomStepper step={step} />
          </div>
          <div className="mt-10">
            <Steps
             step={step} 
            token={token}
            setToken={setToken}
            title={title}
            symbol={symbol}
            decimals={decimals}
            handleChange={handleChange}
            SoftCap={SoftCap}
            setSoftCap={setSoftCap}
            hardCap={hardCap}
            setHardCap={setHardCap}
            Min={Min}
            setMin={setMin}
            Max={Max}
            setMax={setMax}
            refund={refund}
            setRefund={setRefund}
            router={router}
            setRouter={setRouter}
            liquidity={liquidity}
            setLiquidity={setLiquidity}
            listingRate={ListingRate}
            setListingRate={setListingRate}
            iDOstart={IDOstart}
            setIDOStart={setIDOStart}
            liquidityLock={liquidityLock}
            setLiquidityLock={setLiquidityLock}
            increaseStep={increaseStep} decreaseStep={decreaseStep}
            hash={hash}
            captureFile={captureFile}
            website={website}
            setWebsite={setWebsite}
            facebook={facebook}
            setFacebook={setFacebook}
            twitter={twitter}
            setTwitter={setTwitter}
            github={github}
            setGithub={setGithub}
            telegram={telegram}
            setTelegram={setTelegram}
            instagram={instagram}
            setInstagram={setInstagram}
            discord={discord}
            setDiscord={setDiscord}
            redit={redit}
            setRedit={setRedit}
            description={description}
            setDescription={setDescription}
            price={price}
            createPool={createPool}
            IDOstart={IDOstart}
            IDOEnd={IDOEnd}
            setIDOEnd={setIDOEnd}
            Allocaiton1={Allocaiton1}
            setAllocation1={setAllocation1}
            Allocaiton2={Allocaiton2}
            setAllocation2={setAllocation2}
            Allocaiton3={Allocaiton3}
            setAllocation3={setAllocation3}

            />
          </div>
        </div>

        <p className="mt-40 text-sm text-center max-w-3xl mx-auto w-full mb-2 text-gray-500">
          Disclaimer: The information provided shall not in any way constitute a
          recommendation as to whether you should invest in any product
          discussed. We accept no liability for any loss occasioned to any
          person acting or refraining from action as a result of any material
          provided or published.
        </p>
      </div>
      <ResponsiveDialog open={open}/>
    </Layout>
  );
};

export default CreateToken;



const Steps = ({
  step,token,setToken,title,symbol,decimals,increaseStep,decreaseStep,handleChange,SoftCap,setSoftCap,hardCap,setHardCap,Min,setMin,Max
,setMax,refund,setRefund,router,setRouter,liquidity,setLiquidity,ListingRate,setListingRate,IDOstart,setIDOStart,liquidityLock
,setLiquidityLock, 
hash,
captureFile,
website,
setWebsite,
facebook,
setFacebook,
twitter,
setTwitter,
github,
setGithub,
telegram,
setTelegram,
instagram,
setInstagram,
discord,
setDiscord,
redit,setIDOEnd,
setRedit,createPool,
description,setDescription,price,listingRate,iDOstart,IDOEnd,Allocaiton1,setAllocation1,Allocaiton2,setAllocation2,Allocaiton3,setAllocation3
}) => {
  switch (step) {
    case 0:
      return (
        <Step1  
        token={token}
        setToken={setToken}
        name={title}
        symbol={symbol}
        decimals={decimals}
        increaseStep={increaseStep} decreaseStep={decreaseStep} />
      );
    case 1:
      return (
        <Step2 
        token={token}
        handleChange={handleChange}
        SoftCap={SoftCap}
        setSoftCap={setSoftCap}
        hardCap={hardCap}
        setHardCap={setHardCap}
        min={Min}
        setMin={setMin}
        max={Max}
        setMax={setMax}
        refund={refund}
        setRefund={setRefund}
        router={router}
        setRouter={setRouter}
        liquidity={liquidity}
        setLiquidity={setLiquidity}
        listingRate={ListingRate}
        setListingRate={setListingRate}
        IDOstart={IDOstart}
        setIdoStart={setIDOStart}
        liquidityLock={liquidityLock}
        setLiquidityLock={setLiquidityLock}
        IDOEnd={IDOEnd}
        Allocaiton1={Allocaiton1}
        setAllocation1={setAllocation1}
        Allocaiton2={Allocaiton2}
        setAllocation2={setAllocation2}
        Allocaiton3={Allocaiton3}
        setAllocation3={setAllocation3}
        setIDOEnd={setIDOEnd}
        increaseStep={increaseStep} decreaseStep={decreaseStep} />
      );
    case 2:
      return (
        <Step3 
        hash={hash}
        captureFile={captureFile}
        website={website}
        setWebsite={setWebsite}
        facebook={facebook}
        setFacebook={setFacebook}
        twitter={twitter}
        setTwitter={setTwitter}
        github={github}
        setGithub={setGithub}
        telegram={telegram}
        setTelegram={setTelegram}
        instagram={instagram}
        setInstagram={setInstagram}
        discord={discord}
        setDiscord={setDiscord}
        redit={redit}
        setRedit={setRedit}
        description={description}
        setDescription={setDescription}
        
        increaseStep={increaseStep} decreaseStep={decreaseStep} />
      );
    case 3:
      return (
        <Step4
        name={title} 
        hardCap={hardCap}
        decimals={decimals}
        symbol={symbol}
        price={price}
        listingRate={listingRate}
        SoftCap={SoftCap}
        Min={Min}
        Max={Max}
        liquidity={liquidity}
        IDOEnd={IDOEnd}
        iDOstart={iDOstart}
        liquidityLock={liquidityLock}
        website={website}
        facebook={facebook}
        twitter={twitter}
        telegram={telegram}
        github={github}
        instagram={instagram}
        redit={redit}
        createPool={createPool}
        description={description}
        increaseStep={increaseStep} decreaseStep={decreaseStep} />
      );
    default:
      return <div />;
  }
};