import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { LastModified } from '@shared/models/last-modified.model';
import { of } from 'rxjs';

import { CacheService } from '../cache.service';
import { ConfigService } from '../config.service';
import { HttpService } from '../http.service';

describe('CacheService', () => {
    let cacheServiceMock: jasmine.SpyObj<CacheService>;
    let configServiceMock: jasmine.SpyObj<ConfigService>;
    let httpTestingController: HttpTestingController;
    let sut: HttpService;

    beforeEach(() => {
        cacheServiceMock = jasmine.createSpyObj<CacheService>('CacheService', [
            'getByKey',
            'getModifiedDate',
            'bulkGetOrInsert'
        ]);

        configServiceMock = jasmine.createSpyObj<ConfigService>('ConfigService', [
            'read_api_url'
        ]);

        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                HttpService,
                { provide: CacheService, useValue: cacheServiceMock },
                { provide: ConfigService, useValue: configServiceMock }
            ]
        });

        httpTestingController = TestBed.inject(HttpTestingController);
        sut = TestBed.inject(HttpService);
    });

    afterEach(() => {
        httpTestingController.verify();
    });

    describe('get', () => {
        it('should get from correct url', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(new LastModified('LastModified', '7/3/22')));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];

            sut.get('http://mysite.com/users').subscribe((users) => {
                expect(users).toEqual(dummyUsers);
            });

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.method).toBe('GET');
            req.flush(dummyUsers);
        });

        it('should add if-modified-since to header', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(new LastModified('LastModified', '07/03/2022')));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];
            cacheServiceMock.bulkGetOrInsert.and.returnValue(of(dummyUsers));

            sut.get('http://mysite.com/users').subscribe((users) => {
                expect(users).toEqual(dummyUsers);
            });

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.headers.get('if-modified-since')).toBeTruthy();
            req.flush(dummyUsers);
        });

        it('should NOT add if-modified-since to header', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(undefined));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];
            cacheServiceMock.bulkGetOrInsert.and.returnValue(of(dummyUsers));

            sut.get('http://mysite.com/users').subscribe((users) => {
                expect(users).toEqual(dummyUsers);
            });

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.headers.get('if-modified-since')).toBeFalsy();
            req.flush(dummyUsers);
        });

        it('should throw if not 304', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(undefined));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];
            cacheServiceMock.bulkGetOrInsert.and.returnValue(of(dummyUsers));
            const expected = { status: 404, statusText: 'Not Found' };

            sut.get('http://mysite.com/users').subscribe(
                (users) => { expect(false).toEqual(true); },
                (error) => {
                    expect(error.status).toEqual(expected.status);
                }
            );

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.headers.get('if-modified-since')).toBeFalsy();
            req.flush(dummyUsers, expected);
        });

        it('should not throw an error when 304', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(undefined));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];
            cacheServiceMock.bulkGetOrInsert.and.returnValue(of(dummyUsers));
            const expected = { status: 304, statusText: 'OK' };

            sut.get('http://mysite.com/users').subscribe(
                (users) => { expect(users).toEqual(dummyUsers); },
                (error) => { expect(false).toEqual(true); }
            );

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.headers.get('if-modified-since')).toBeFalsy();
            req.flush(dummyUsers);
        });

        it('should call bulkGetOrInsert', () => {
            cacheServiceMock.getModifiedDate.and.returnValue(of(undefined));
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];
            cacheServiceMock.bulkGetOrInsert.and.returnValue(of(dummyUsers));

            sut.get('http://mysite.com/users').subscribe((users) => {
                expect(cacheServiceMock.bulkGetOrInsert).toHaveBeenCalled();
            });

            const req = httpTestingController.expectOne('http://mysite.com/users');
            expect(req.request.headers.get('if-modified-since')).toBeFalsy();
            req.flush(dummyUsers);
        });
    });

    describe('delete', () => {
        it('should call the correct url to delete', () => {
            sut.delete('http://mysite.com/delete').subscribe((users) => {
                expect(users).toEqual('');
            });

            const req = httpTestingController.expectOne('http://mysite.com/delete');
            expect(req.request.method).toBe('DELETE');
            req.flush('');
        });
    });

    describe('post', () => {
        it('should call the correct url to delete', () => {
            const dummyUsers = [
                { login: 'John' },
                { login: 'Doe' }
            ];

            sut.post('http://mysite.com', dummyUsers).subscribe(
                (res) => { expect(res).toEqual('');
            });

            const req = httpTestingController.expectOne('http://mysite.com');
            expect(req.request.method).toBe('POST');
            req.flush('');
        });
    });
});
