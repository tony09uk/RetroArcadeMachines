import { HttpClient, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { AuthService } from '@core/services/auth.service';
import { ErrorInterceptor } from './error.interceptor';

// TODO: fix tests -> not working
describe('ErrorInterceptor', () => {
    let httpClient: HttpClient;
    let testController: HttpTestingController;

    const authServiceMock = jasmine.createSpyObj<AuthService>(['signOut']);
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                { provide: AuthService, useValue: authServiceMock },
                {
                    provide: HTTP_INTERCEPTORS,
                    useClass: ErrorInterceptor,
                    multi: true
                }
            ]
        });

        httpClient = TestBed.inject(HttpClient);
        testController = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        testController.verify();
    });

    describe('intercept', () => {
        xit('should signout when a 403 status code is returned', () => {
            const url = 'testUrl';
            httpClient.get(url).subscribe((res: any) =>
                (response: any) => { },
                (error: HttpErrorResponse) => {
                    expect(authServiceMock.signOut).toHaveBeenCalledTimes(1);
            });
            const testRequest = testController.expectOne(url);

            testRequest.flush(new HttpErrorResponse({error: 'the error message', status: 403}) );
        });

        xit('should signout when a 401 status code is returned', () => {
            const url = 'testUrl';
            httpClient.get(url).subscribe((res: any) =>
                (response: any) => { },
                (error: HttpErrorResponse) => {
                    expect(authServiceMock.signOut).toHaveBeenCalledTimes(1);
            });
            const testRequest = testController.expectOne(url);

            testRequest.flush(new HttpErrorResponse({error: 'the error message', status: 401}) );
            expect(authServiceMock.signOut).toHaveBeenCalledTimes(1);

        });

        xit('should throw an error ', () => {
            const url = 'testUrl';
            httpClient.get(url).subscribe((res: any) =>
                (response: any) => { },
                (error: HttpErrorResponse) => {
                    expect(error.message).toBeTruthy();
            });
            const testRequest = testController.expectOne(url);

            testRequest.flush(new HttpErrorResponse({error: 'the error message', status: 500}) );
        });
    });
});
