import {DashboardComponent} from './dashboard.component';
import {Shallow} from 'shallow-render';
import {DashboardModule} from '../dashboard.module';

describe('DashboardComponent', () => {

  let shallow: Shallow<DashboardComponent>;

  beforeEach(() => {
    shallow = new Shallow(DashboardComponent, DashboardModule);
  });

  it('should display the title', async () => {
    const {fixture, find} = await shallow.render(`<app-dashboard></app-dashboard>`);

    expect(find('p').nativeElement.textContent).toBe('dashboard works!');
  });

});
