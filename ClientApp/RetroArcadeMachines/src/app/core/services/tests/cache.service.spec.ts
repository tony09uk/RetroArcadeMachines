import { TestBed } from '@angular/core/testing';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { of } from 'rxjs';
import { AuthService } from '../auth.service';
import { CacheService } from '../cache.service';
import { ConfigService } from '../config.service';

describe('CacheService', () => {
    let ngxIndexedDBServiceMock: jasmine.SpyObj<NgxIndexedDBService>;

    let sut: CacheService;

    beforeEach(() => {
        ngxIndexedDBServiceMock = jasmine.createSpyObj<NgxIndexedDBService>('NgxIndexedDBService', [
            'getByKey',
            'getAll',
            'count',
            'updateByKey',
            'update',
            'bulkAdd',
            'getByKey',
        ]);

        TestBed.configureTestingModule({
            providers: [
                AuthService,
                { provide: NgxIndexedDBService, useValue: ngxIndexedDBServiceMock },
                { provide: ConfigService, useValue: { is_cache_enabled: true } }
            ]
        });

        sut = TestBed.inject(CacheService);
    });


    it('should call getAll', () => {
        ngxIndexedDBServiceMock.getAll.and.returnValue(of([{ id: 123 }]));
        const storeNameParam = 'testStoreName';
        const idParam = 'id';

        sut.getAll(storeNameParam)
            .subscribe(
                val => { expect(ngxIndexedDBServiceMock.getAll).toHaveBeenCalledOnceWith(storeNameParam); },
                err => { }
            );
    });

    it('should call update', () => {
        const value = [{ id: 123 }];

        ngxIndexedDBServiceMock.update.and.returnValue(of(value));
        const storeNameParam = 'testStoreName';

        sut.update(storeNameParam, value)
            .subscribe(
                val => { expect(ngxIndexedDBServiceMock.update).toHaveBeenCalledOnceWith(storeNameParam, value); },
                err => { }
            );
    });

    it('should call bulkAdd', () => {
        const values = [{ id: 123 }];

        ngxIndexedDBServiceMock.bulkAdd.and.returnValue(of( [1, 2, 3] ));
        const storeNameParam = 'testStoreName';

        sut.bulkAddAndReturnValues(storeNameParam, values)
            .subscribe(
                val => { expect(ngxIndexedDBServiceMock.bulkAdd).toHaveBeenCalledOnceWith(storeNameParam, [ Object({ id: 123 }) ]); },
                err => { }
            );
    });
});
