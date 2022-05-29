import React, { useState, useEffect } from "react";
import { SafeAreaView, ScrollView } from "react-native";
import CommunityItem from "../components/CommunityItem/CommunityItem";
import Input from "../components/Input/";


const Communities = (props) => {
    const [data, setData] = useState([]);

    const getMovies = async () => {
        try {
            const response = await fetch('http://bildir.azurewebsites.net/api/v1/Community');
            const json = await response.json();
            setData(json.data)

        } catch (error) {
            console.error(error);
        }

    }
    useEffect(() => {
        getMovies();
    }, []);


    return (
        <SafeAreaView>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic">

                <Input label='Topluluk Ara' />
                {data.map((d, index) => {
                    return (<CommunityItem key={index} detail={props.navigation} data={d} />)
                })}

            </ScrollView>

        </SafeAreaView>
    )
}

export default Communities;