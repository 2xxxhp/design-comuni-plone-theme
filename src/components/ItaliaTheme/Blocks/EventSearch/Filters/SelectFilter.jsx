import React, { useEffect } from 'react';
import { SelectInput } from '@italia/components';
import { useDispatch, useSelector } from 'react-redux';
import { searchContent } from '@plone/volto/actions';

const SelectFilter = ({ options, value, id, onChange }) => {
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return state;
  });
  const selectOptions = state?.search?.subrequests[
    options?.dispatch?.subrequests_name
  ]?.items?.map((i) => {
    return {
      value: i.UID,
      label: i.title,
    };
  });

  useEffect(() => {
    dispatch(
      searchContent(
        options?.dispatch?.path,
        {
          portal_type: options?.dispatch?.portal_types,
          fullobjects: options?.dispatch?.fullobjects,
          metadata_fields: 'UID',
          b_size: options?.dispatch?.b_size,
        },
        options?.dispatch?.subrequests_name,
      ),
    );
  }, []);

  return (
    <div className="mr-lg-3 my-2 my-lg-1 filter-wrapper select-filter">
      <SelectInput
        id="search-sort-on"
        value={value}
        placeholder={options?.placeholder}
        onChange={(opt) => {
          onChange(id, opt);
        }}
        options={selectOptions}
      />
    </div>
  );
};

export default SelectFilter;
