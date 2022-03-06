import { GridConfig } from '../../models/grid-config.model';
import { GridFilterService } from '../grid-filter-service';
import { GridDataFactoryData } from './grid-data-factory.data';

describe('GridFilterService', () => {
    let sut: GridFilterService;
    let data: GridConfig<GridDataFactoryData>;

    beforeEach(() => {
        data = GridDataFactoryData.create();
        sut = new GridFilterService();
    });

    describe('initFilters', () => {
        it('should populate columns property from the passed headers', () => {
            sut.initFilters(data.columnHeader, data.tableData);
            expect(sut.columns.length).toEqual(4);
            expect(sut.columns[0].friendlyName).toEqual('Id');
            expect(sut.columns[1].friendlyName).toEqual('Name');
            expect(sut.columns[2].friendlyName).toEqual('Entry Price');
            expect(sut.columns[3].friendlyName).toEqual('Is Allowed');
        });

        it('should NOT populate columns property when the passed headers are undefined', () => {
            sut.initFilters(undefined, data.tableData);
            expect(sut.columns.length).toEqual(0);
        });

        it('should have distinct data when filter type is multi select', () => {
            sut.initFilters(data.columnHeader, data.tableData);
            expect(sut.columns[1].distinctData.length).toEqual(2);
        });

        it('should have distinct data  when filter type is number range', () => {
            sut.initFilters(data.columnHeader, data.tableData);
            expect(sut.columns[2].distinctData.length).toEqual(2);
        });
    });

    describe('watchColumnFilterChanged', () => {
        it('should emit column', () => {
            sut.initFilters(data.columnHeader, data.tableData);
            const expected = sut.columns[2];

            sut.watchColumnFilterChanged()
                .subscribe(
                    actual => {
                        expect(actual).toBe(expected);
                    }
                );
            sut.updateFilter(sut.columns[2].name, ['1', '2']);
        });
    });

    describe('clearFilters', () => {
        beforeEach(() => {
            sut.initFilters(data.columnHeader, data.tableData);
        });

        it('should remove all filters from column', () => {
            sut.clearFilters();

            expect(sut.columns[0].appliedFilters.length).toBe(0);
            expect(sut.columns[1].appliedFilters.length).toBe(0);
            expect(sut.columns[2].appliedFilters.length).toBe(0);
            expect(sut.columns[3].appliedFilters.length).toBe(0);
        });

        it('should emit when remove all filters from column when complete', () => {
            sut.watchColumnFilterChanged()
                .subscribe(
                    actual => { expect(actual).toBeTruthy(); }
                );

            sut.clearFilters();
        });
    });

    describe('updateFilter', () => {
        beforeEach(() => {
            sut.initFilters(data.columnHeader, data.tableData);
        });

        it('should add filter to passed column', () => {
            sut.updateFilter(sut.columns[1].name, ['testName']);

            expect(sut.columns[1].appliedFilters.length).toEqual(1);
            expect(sut.columns[1].appliedFilters[0]).toEqual('testName');
        });

        it('should emit after adding filter to passed column', () => {
            sut.watchColumnFilterChanged()
                .subscribe(
                    actual => { expect(actual).toBeTruthy(); }
                );

            sut.updateFilter(sut.columns[1].name, ['testName']);
        });
    });

    describe('getColumn', () => {
        beforeEach(() => {
            sut.initFilters(data.columnHeader, data.tableData);
        });

        it('should return column that matches name', () => {
            const actual = sut.getColumn(sut.columns[1].name);
            expect(actual).toEqual(sut.columns[1]);
        });

        it('should undefined when passed name does NOT match column any names', () => {
            const actual = sut.getColumn('nonExistantName');
            expect(actual).toEqual(undefined);
        });
    });
});
