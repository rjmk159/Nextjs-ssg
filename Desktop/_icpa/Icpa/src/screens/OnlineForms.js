import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  Dimensions,
  ScrollView,
  View,
  FlatList,
  ActivityIndicator,
  Text,
} from 'react-native';
import {Block, theme} from 'galio-framework';
import articles from '../constants/articles';
import {FloatingAction} from 'react-native-floating-action';
import {checkAuthorization} from '../components/Authorization';
import {showTopErrorMessage} from '../_utils/helper';
import {Card} from '../components';
const {width, height} = Dimensions.get('screen');
import {
  uploadFile,
  listFile,
  searchList,
  downloadFile,
} from '../redux/slices/onlineForms';
import {getToken} from '../_utils/helper';
import {listCount, options} from '../_const/const';
import {setLoader} from '../redux/slices/onlineForms';

export default function onlineForms() {
  const [pagination, setPagination] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(null);
  const [formDescription, setDescription] = useState(null);
  const dispatch = useDispatch();
  const state = useSelector((_state) => _state.dataLogin);
  const list = useSelector((_state) => _state.dataOnlineForms);

  useEffect(() => {
    dispatch(setLoader(true))
    getList(list.currentPage);
    console.log('getList');
  });

  const handleUpload = (e) => {
    const data = new FormData();
    data.append('fileField', e.target.files[0]);
    setFormData(data);
  };

  const handleFormPopup = () => {
    if (!formDescription) {
      return;
    }
    let token = state.token.jwtToken || getToken();
    formData.set('fileDescription', formDescription);
    dispatch(
      uploadFile(formData, 'onlineForms', token, (error, message) => {
        if (error) {
          cogoToast.error(message || 'Something went wrong', options);
        } else {
          showTopErrorMessage('Uploaded successfully');
          getList();
          setFormData(null);
          setDescription(null);
        }
      }),
    );
  };
  const closeUploadModal = () => {
    setDescription(null);
    setFormData(null);
  };
  const getList = (pageNo = 1) => {
    // let token = state.token.jwtToken || getToken();
    setLoading(true);
    let token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1ODg5NzI4OTcsImRhdGEiOnsiZW1haWwiOiJzYXJvMjIzNDUzMTNAZ21pbGlhLmNvbSIsIl9pZCI6IjVlOWM3ZmUxZjc2ZDg5NDAxMDMwOTQ5ZCIsInJvbGUiOiJhZG1pbiJ9LCJpYXQiOjE1ODg4ODY0OTd9.L8GZP2a3hC3Jz0rZqjvTNz4v7hTQgLr3E2YMfkMgows`;
    dispatch(
      listFile(token, 'onlineForms', pageNo, (error, message) => {
        if (error) {
          showTopErrorMessage(message || 'Something went wrong');
        }
        setLoading(false);
      }),
    );
    // handlePagination();
  };
  const handleSearch = (e) => {
    let value = e.target.value;
    e.preventDefault();
    dispatch(searchList(value));
  };
  const handleDownload = (download) => {
    let token = state.token.jwtToken || getToken();
    dispatch(
      downloadFile(download, token, (error, message) => {
        if (error) {
          showTopErrorMessage(message || 'Something went wrong');
        }
      }),
    );
  };

  console.log(list);
  return (
    <Block flex center style={styles.home}>
      <View style={{marginBottom: 40}}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.articles}>
          {!list.isLoading && loading ? (
            list && list.filesList && list.filesList.length ? (
              <Block flex row>
                <FlatList
                  data={list.filesList}
                  onRefresh={() => {
                    getList(1);
                  }}
                  refreshing={loading}
                  renderItem={({item}) => <Card item={item} horizontal />}
                  keyExtractor={(item) => item._id}
                />
              </Block>
            ) : (
              <View style={[styles.container, styles.horizontal]}>
              <Text>No Letters Found</Text>
              </View>
            )
          ) : (
            <ActivityIndicator size="large" />
          )}
        </ScrollView>
        <FloatingAction
          action={{margin: 50}}
          onPressItem={(name) => {
            console.log(`selected button: ${name}`);
          }}
        />
      </View>
    </Block>
  );
}
const styles = StyleSheet.create({
  home: {
    width: width,
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
  container: {
    flex: 1,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});
