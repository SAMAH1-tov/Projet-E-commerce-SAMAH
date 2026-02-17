import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { NavBar } from "../comp/nav-bar/nav-bar";
import { SideBar } from "../comp/side-bar/side-bar";
import { provideCharts, withDefaultRegisterables } from 'ng2-charts';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartType, ChartOptions } from 'chart.js';
import { OrderService } from '../../Services/order-service';
import { ClientsService } from '../../Services/clients-service';
import { ProductService } from '../../Services/product-service';
import { Order } from '../../models/order';
import { Client } from '../../models/client';
import { Product } from '../../models/product';


@Component({
  selector: 'app-dashboard',
  imports: [NavBar, SideBar, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  // Données réelles
  orders: Order[] = [];
  clients: Client[] = [];
  products: Product[] = [];
  
  // Statistiques calculées
  totalSales: number = 0;
  totalOrders: number = 0;
  totalClients: number = 0;
  totalProducts: number = 0;
  satisfactionRate: number = 0;
  monthlyGrowth: number = 0;
  
  // Line Chart Data
  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Ventes mensuelles',
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,1)',
        fill: 'origin',
      },
      {
        data: [28, 48, 40, 19, 86, 27, 90],
        label: 'Nouveaux clients',
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)',
        fill: 'origin',
      },
    ],
    labels: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet'],
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Évolution des ventes et clients',
      },
    },
  };

  public lineChartType: ChartType = 'line';

  // Bar Chart Data
  public barChartData: ChartConfiguration<'bar'>['data'] = {
    datasets: [
      {
        label: 'Produits vendus',
        data: [120, 190, 130, 150, 220, 330, 410],
        backgroundColor: 'rgba(54, 162, 235, 0.8)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
      {
        label: 'Revenus (€)',
        data: [2400, 3800, 2600, 3000, 4400, 6600, 8200],
        backgroundColor: 'rgba(255, 99, 132, 0.8)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
    labels: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
  };

  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Ventes hebdomadaires',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  public barChartType: ChartType = 'bar';

  constructor(
    private orderService: OrderService,
    private clientService: ClientsService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    // Charger les données des services
    this.orderService.findAll().subscribe({
      next: (orders) => {
        this.orders = orders;
        this.calculateOrderStats();
        this.updateChartData();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des commandes:', error);
      }
    });

    this.clientService.findAll().subscribe({
      next: (clients) => {
        this.clients = clients;
        this.totalClients = clients.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des clients:', error);
      }
    });

    this.productService.findAll().subscribe({
      next: (products) => {
        this.products = products;
        this.totalProducts = products.length;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des produits:', error);
      }
    });
  }

  calculateOrderStats(): void {
    this.totalOrders = this.orders.length;
    this.totalSales = this.orders.reduce((sum, order) => sum + (order.price_total || 0), 0);
    
    // Calculer le taux de satisfaction (simulation basée sur les états des commandes)
    const completedOrders = this.orders.filter(order => order.state === 'completed' || order.state === 'delivered').length;
    this.satisfactionRate = this.totalOrders > 0 ? Math.round((completedOrders / this.totalOrders) * 100) : 0;
    
    // Calculer la croissance mensuelle (simulation)
    this.monthlyGrowth = Math.round(Math.random() * 20); // Simulation de 0-20%
  }

  updateChartData(): void {
    // Mettre à jour les graphiques avec les données réelles
    // Pour l'instant, gardez les données de démonstration
    // Vous pouvez implémenter la logique pour extraire les données réelles ici
  }
}
