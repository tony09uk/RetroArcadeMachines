import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { of } from 'rxjs';
import { GridConfig } from '../../models/grid-config.model';
import { GridDataFactoryService } from '../grid-data-factory.service';
import { GridDataFactoryData } from './grid-data-factory.data';

describe('GridDataFactoryService', () => {
    let sut: GridDataFactoryService;
    let httpServiceMock: jasmine.SpyObj<HttpService>;
    const data = GridDataFactoryData.create();

    beforeEach(() => {
        httpServiceMock = jasmine.createSpyObj<HttpService>('HttpService', {
            get: of(data)
        });

        TestBed.configureTestingModule({
            providers: [
                GridDataFactoryService,
                { provide: HttpService, useValue: httpServiceMock }
            ]
        });
        sut = TestBed.inject(GridDataFactoryService);
    });

    it('should throw an error if no value was passed', () => {
        sut.create(undefined, data.columnHeader, 'test')
            .subscribe(
                val => {},
                err => { expect(err).toBeInstanceOf(Error); }
            );
    });

    it('should call get if provided value is a string', () => {
        sut.create('testEndpoint', data.columnHeader, 'test')
            .subscribe(
                val => expect(httpServiceMock.get).toHaveBeenCalled()
            );
    });

    it('should NOT call get if provided value is data', () => {
        sut.create(data.tableData, data.columnHeader, 'test')
            .subscribe(
                val => expect(httpServiceMock.get).not.toHaveBeenCalled()
            );
    });

    it('should return an instance of GridConfig', () => {
        sut.create(data.tableData, data.columnHeader, 'test')
            .subscribe(
                val => expect(val).toBeInstanceOf(GridConfig)
            );
    });
});
