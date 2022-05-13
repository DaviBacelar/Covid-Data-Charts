import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import Axios from 'axios';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';

import Header from '../components/Header';
import ReportTab from '../components/ReportTab/ReportTab';
import SelectCountry from '../components/SelectCountry';
import Loading from '../components/Loading';

import styles from '../styles/Home.module.css';
import { ReportsFiltersInterface } from '../interfaces/ReportsFiltersInterface';
import { ReportDataInterface } from '../interfaces/ReportDataInterface';
import RankTab from '../components/RankTab/RankTab';
import { RankFiltersInterface } from '../interfaces/RankFiltersInterface';
import { RankDataInterface } from '../interfaces/RankDataInterface';
import { DEFAULT_RANK_DATA, DEFAULT_RANK_FILTERS, DEFAULT_REPORT_DATA, DEFAULT_REPORT_FILTERS } from '../utility/globalConstants';

interface props {
  activeDarkMode: (value: boolean) => boolean;
}

const Home: NextPage<props> = ({ activeDarkMode }: props) => {
  const [countries, setCountries] = useState([]);
  const [reportsData, setReportsData] = useState<ReportDataInterface>(DEFAULT_REPORT_DATA);
  const [reportFilters, setReportFilters] = useState<ReportsFiltersInterface>(DEFAULT_REPORT_FILTERS);
  const [rankData, setRankData] = useState<RankDataInterface>(DEFAULT_RANK_DATA);
  const [rankFilters, setRankFilters] = useState<RankFiltersInterface>(DEFAULT_RANK_FILTERS);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tab, setTab] = useState('reports');

  useEffect(() => {
    setIsLoading(true);
    Axios.get('/api/countries')
      .then((res) => setCountries(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    if(tab === 'reports') {
      getReportData();
    }
  }, [reportFilters, tab]);

  useEffect(() => {
    if(tab === 'rank') {
      getRankData();
    }   
  }, [rankFilters, tab]);

  const getReportData = () => {
    setIsLoading(true);
    Axios.get(getUrlWithQuery('/api/reports', reportFilters))
      .then((res) => setReportsData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const getRankData = () => {
    setIsLoading(true);
    Axios.get(getUrlWithQuery('/api/rank', rankFilters))
      .then((res) => setRankData(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  };

  const setBothFilters = (key: string, value: string) => {
    setReportFilters({...reportFilters, [key]: value});
    setRankFilters({...rankFilters, [key]: value});
  };
  
  const setReportsFiltersHandler = (key: string, value: string) => setReportFilters({...reportFilters, [key]: value});

  const setRankFiltersHandler = (key: string, value: string | number) => setRankFilters({...rankFilters, [key]: value});

  const getUrlWithQuery = (baseEndpoint: string, filters: unknown) => {
    const selectedFilters = {...filters as { [key: string]: string }};
    let query: string[] = [];

    for(const key of Object.keys(selectedFilters)) {
      query = [...query, `${key}=${selectedFilters[key]}`];
    }

    return `${baseEndpoint}?${query.join('&')}`;
  };

  const tabChangeHandler = (event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
  };

  return (
    <>
      <Header activeDarkMode={activeDarkMode} />
      <div className={styles.content}>
        <SelectCountry
          country={reportFilters?.country ?? 'World'}
          countries={countries}
          setFiltersHandler={setBothFilters}
        />
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={tabChangeHandler} variant="fullWidth">
              <Tab label="Reported cases" value="reports" />
              <Tab label="Ranked charts" value="rank" />
            </TabList>
          </Box>
          <TabPanel value="reports">
            <ReportTab 
              dates={reportsData?.dates}
              values={reportsData?.values} 
              setFiltersHandler={setReportsFiltersHandler}
              filters={reportFilters}
            />
          </TabPanel>
          <TabPanel value="rank">
            <RankTab
              allCountries={countries}
              countries={rankData?.countries}
              values={rankData?.values}
              setFiltersHandler={setRankFiltersHandler}
              filters={rankFilters} 
            />
          </TabPanel>
        </TabContext>
      </div>
      {isLoading && <Loading />}
    </>
  )
}

export default Home;
