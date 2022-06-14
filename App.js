import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, ScrollView,View,TouchableOpacity} from 'react-native';
import { Audio } from 'expo-av';
import { useState } from 'react';
import {AntDesign} from '@expo/vector-icons'

export default function App() {

  const [audio,setaudio] = useState();
  const [song,setsong] = useState([
      {
        name:'Eu te Odeio',
        isplaying: false,
        artist:'Tayrk',
        url:require('./audio/audio.mp3')
      },
      {
        name:'Is',
        isplaying: false,
        artist:'Dragons',
        url:require('./audio/audio.mp3')
      },

      {
        name:'Enemy',
        isplaying: false,
        artist:'Imagine Dragons',
        url:require('./audio/audio.mp3')
      }

  ])

  const songselect = async (id) =>{
    let curfile = null;
     let changesong = song.filter((val,k)=>{
       if(id==k){
        song[k].isplaying = true;
        curfile = song[k].url;
       }else{
        song[k].isplaying = false;
       }
       return song[k]
     })
     if(audio != null){
       audio.unloadAsync();
     }
     let curaudio = new Audio.Sound();

     try {
       await curaudio.loadAsync(curfile);
       await curaudio.playAsync();
     } catch (error) {

     }
     setaudio(curaudio)
     setsong(changesong)
  }



  return (

   <ScrollView contentContainerStyle={styles.container}>
    <StatusBar hidden/>
    <View style={styles.header}>
      <Text style={styles.texts}>Vacant.Indie</Text>
    </View>
    <View style={styles.table}>
      <Text style={styles.texts}>Musica</Text>
      <Text style={styles.texts}>Artista</Text>
    </View>

        {song.map((val,k)=>{

          if(val.isplaying == true){
           return( <View >
              <TouchableOpacity style={{width:'100%',backgroundColor:'rgba(135, 12, 182,0.5) '}}>
              <Text style={styles.textsong}>{val.name}</Text>
              <Text style={styles.textsong}>{val.artist}</Text>
              </TouchableOpacity>
            </View>
           )}else{
             return(
              <View>
              <TouchableOpacity style={styles.table} onPress={()=> songselect(k)}>
              <Text style={styles.textsong}>{val.name}</Text>
              <Text style={styles.textsong}>{val.artist}</Text>
              </TouchableOpacity>
            </View>
             )
           }


        })}

   </ScrollView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',

  },
  header:{
    backgroundColor: 'rgba(135, 12, 182,0.5) ',
    alignItems:'center',
    height:100,
    justifyContent:'center',

  },
  texts:{
    fontSize:30,
    color:'rgba(188, 187, 189,0.9)',


  },
  table:{
    flexDirection:'row',
    justifyContent:'space-between',
    padding:20,
    borderBottomWidth:1,
    borderColor:'rgba(135, 12, 182,0.5)'
  },
  textsong:{
    fontSize:20,
    color:'rgba(188, 187, 189,0.9)',

  },
  player:{
    width:'100%',
    height:200,
    position:'absolute',
    alignContent:'stretch',
    backgroundColor:'white'
  }

});
