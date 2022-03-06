import { YesNoPipe } from '@core/pipes/yes-no.pipe';
import { FilterTypes } from '../../enums/filter-types.enum';
import { GridConfig } from '../../models/grid-config.model';
import { HeaderItem } from '../../models/header-item';

export interface GridDataFactoryData {
    id: string;
    name: string;
    entryPrice: number;
    canEnter: boolean;
}

export class GridDataFactoryData {
    static create(): GridConfig<GridDataFactoryData> {
        const gridConfig = new GridConfig<GridDataFactoryData>();
        gridConfig.tableData = [
            { id: '1', name: 'testName', entryPrice: 123, canEnter: false },
            { id: '2', name: 'testName2', entryPrice: 1234, canEnter: false },
            { id: '3', name: 'testName2', entryPrice: 1234, canEnter: false },
        ];

        gridConfig.columnHeader = {
            id: {
                friendlyName: 'Id',
                filterType: FilterTypes.None,
                appliedFilters: [],
                hideProperty: true
            } as HeaderItem,
            name: {
                friendlyName: 'Name',
                filterType: FilterTypes.MultiSelect,
                pipe: new YesNoPipe(),
                appliedFilters: [],
                hideProperty: false,
                shouldHideAtPixels: 150000
            } as HeaderItem,
            entryPrice: {
                friendlyName: 'Entry Price',
                pipe: new YesNoPipe(),
                filterType: FilterTypes.NumberRange,
                appliedFilters: [],
                hideProperty: false,
            } as HeaderItem,
            canEnter: {
                friendlyName: 'Is Allowed',
                pipe: new YesNoPipe(),
                filterType: FilterTypes.String,
                appliedFilters: [],
                hideProperty: false,
            } as HeaderItem,
        };

        return gridConfig;
    }
}
