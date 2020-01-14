import {AppComponent} from './app.component';
import {Shallow} from 'shallow-render';
import {AppModule} from './app.module';
import {RouterOutlet} from '@angular/router';

describe('AppComponent', () => {

  let shallow: Shallow<AppComponent>;

  beforeEach(() => {
    shallow = new Shallow(AppComponent, AppModule);
  });

  it('should display a router-outlet', async () => {
    const {fixture, findComponent} = await shallow.render();

    expect(findComponent(RouterOutlet)).toBeDefined();
  });

  it(`should have a proper navigation'`, async () => {
    const {fixture, find} = await shallow.render();

    const navItems = find('ul li');
    expect(navItems.length).toBe(2);
    expect(navItems.map((navItem) => navItem.nativeElement.textContent))
      .toEqual(['Dashboard', 'Todos']);
  });

});
