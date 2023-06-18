import useSWR, { SWRConfiguration } from 'swr';
import { IProduct } from '../interfaces';
import { seedData } from '../database';

export const useProducts = (url: string, config: SWRConfiguration = {}) => {
  
  return {
    products: seedData.initialData.products || [],
    isLoading: false,
    isError: false
  }
}

export const useHomeProducts = (url: string, config: SWRConfiguration = {}) => {
  
  return {
    homeProducts: seedData.initialData.homeProducts || [],
    isLoadingHomeProducts: false,
    isError: false
  }
}