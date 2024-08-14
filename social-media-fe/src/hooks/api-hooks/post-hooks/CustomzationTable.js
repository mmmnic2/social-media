import { getOptionsViaCustomization } from '@/api/product-api/customization';
import LinearProgressBar from '@/components/core/LinearProgressBar/LinearProgressBar';
import RMSTable from '@/components/core/RMSTable/RMSTable';
import { useGetAllCustomizations } from '@/components/hooks/api-hooks/product-hooks/useCustomization';
import { filtersSelector } from '@/redux/global/selectors';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { customizationColumnProperties } from './CustomizationColumnProperties';
import CustomizationChipLabels from './frameworkComponents/CustomizationChipLabels';
import CustomizationMasterDetails from './frameworkComponents/CustomizationMasterDetails';
import CustomizationRules from './frameworkComponents/CustomizationRules';
import CustomizationActions from './frameworkComponents/actions';


function CustomzationTable() {
  const [selectCustomization, setSelectCustomization] = useState([]);
  const tableRef = useRef(null);
  const headCells = useMemo(() => customizationColumnProperties(), []);
  const filterSelector = useSelector(filtersSelector);
  const { data: customizations, isLoading: customizationsLoading, isFetching: customizationsFetching } = useGetAllCustomizations();
  const [customizationOptions, setCustomizationOptions] = useState([]);

  useEffect(() => {
    if (customizations) {
      const fetchOptions = async () => {
        const optionsData = await Promise.all(
          customizations.map(async (item) => {
            const { customization_id, customization, note, customizationRule, isPricing } = item;
            try {
              const response = await getOptionsViaCustomization(customization_id);
              const options = response.data.data;
              return {
                customizationId: customization_id,
                customizationName: customization,
                customizationNote: (!note || note === "") ? 'No information' : note,
                optionsData: options,
                numberOfOption: options.length,
                isPricing: isPricing,
                customizationRules: customizationRule
              };
            } catch (error) {
              console.error(`Error fetching options for customization ${customization_id}:`, error);
              return {
                customizationId: customization_id,
                customizationName: customization,
                customizationNote: (!note || note === "") ? 'No information' : note,
                optionsData: [],
                numberOfOption: 0,
                isPricing: isPricing,
                customizationRules: customizationRule,
                error: error.message,
              };
            }
          })
        );
        setCustomizationOptions(optionsData);
      };

      fetchOptions();
    }
  }, [customizations, customizationsFetching]);

  useEffect(() => {
    if (!customizationsFetching && customizations)
      tableRef.current.handleSearch(filterSelector.searchInput);
  }, [filterSelector.searchInput]);

  return (
    <>
      {
        (customizationsLoading || customizationsFetching) ?
          <LinearProgressBar /> :
          <RMSTable
            height={730}
            ref={tableRef}
            headCells={headCells}
            body={customizationOptions || []}
            selected={selectCustomization}
            setSelected={setSelectCustomization}
            rowSelection="multiple"
            isMasterDetail={true}
            isCheckBoxColumn={true}
            masterDetailNode={CustomizationMasterDetails}
            frameworkComponents={
              {
                actions: (params) => <CustomizationActions params={params} />,
                rule: (params) => <CustomizationRules rule={params.customizationRules} />,
                priceChipLabels: (params) => <CustomizationChipLabels status={params.isPricing} />,
              }
            }
          />
      }
    </>

  )
}

export default CustomzationTable