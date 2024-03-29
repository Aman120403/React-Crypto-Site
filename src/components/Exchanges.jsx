import React,{useEffect,useState} from 'react';
import axios from "axios";
import {server} from "../index";
import {Container,Heading,Image,Text} from "@chakra-ui/react";
import Loader from "./Loader";
import {HStack,Button,VStack} from "@chakra-ui/react";
import ErrorComponent from "./ErrorComponent";

const Exchanges = () => {
    const [exchanges, setExchanges]= useState([]);
    const [Loading, setLoading]= useState(true);
    const [Error, setError]= useState(false);
    useEffect(()=>{
        const fetchExchanges=async () =>{
            try{
                const {data} = await axios.get(`${server}/exchanges`);
                setExchanges(data);
                setLoading(false)
            }catch{
                setError(true);
                setLoading(false);
            }
        };
        fetchExchanges();
    },[]);
    if(Error) return <ErrorComponent message={"Error while Fetching Exchanges"}/>;
    return( <Container maxW={"container.xl"}>
        {Loading?(<Loader/>
        ) : (
        <>
        <HStack wrap={"wrap"}>
            {exchanges.map((i)=>(
                <ExchangeCard 
                key={i.id}
                name={i.name}
                img={i.image}
                rank={i.trust_score_rank}
                url={i.url}
                />
            )
            )}
        </HStack>
        </>
        )}
        </Container>
    );
};const ExchangeCard = ({name,img,rank,url}) => (
    <a href={url} target={"blank"}>
        <VStack w={"52"} shadow={"lg"} p={"8"} borderRadius={"lg"} transition={"all 0.3s"}
        m={"4"}
        css={{
            "&:hover":{
                transform:"scale(1.1)"
            }
        }}

        >
            <Image src={img} w={"10"} h={"10"} objectFit={"contain"} alt={"Exchange"}/>
            <Heading size={"md"} noOfLines={1}>
                {rank}
            </Heading>
            <Text noOfLines={1}>{name}</Text>
        </VStack>
    </a>
    );

export default Exchanges;