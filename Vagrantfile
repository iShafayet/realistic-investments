# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant.configure("2") do |config|

    config.vm.box = "generic/ubuntu2004"
  
    config.vm.hostname = 'realistic-investments-1-1'
    config.vm.network "private_network", ip: "192.168.33.102"
  
    config.vm.provider "virtualbox" do |vb|
      vb.name = config.vm.hostname
      vb.memory = "512"
    end
    
    config.vm.synced_folder "./", "/home/vagrant/realistic-investments", mount_options: ["dmode=775,fmode=777"]
    
    config.vm.provision "setup-dependencies", type: "shell", privileged: false do |s|
      s.path = "./devops/vagrant/setup-dependencies.sh"
    end
  
    # == ref
    # Disable automatic box update checking. If you disable this, then
    # boxes will only be checked for updates when the user runs
    # `vagrant box outdated`. This is not recommended.
    # config.vm.box_check_update = false
  
  end
  
  
  
  